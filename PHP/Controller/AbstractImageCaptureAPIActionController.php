<?php
/*
 * BSD 3-Clause License
 *
 * Copyright (c) 2019, TASoft Applications
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *  Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 *  Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 *  Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

namespace Skyline\ImageCapture\Controller;

use Skyline\API\Controller\AbstractAPIActionController;
use Skyline\API\Render\JSONRender;
use Skyline\ImageCapture\Exception\DeleteImageException;
use Skyline\ImageCapture\Exception\ImageCaptureException;
use Skyline\ImageCapture\Exception\ImageManipulationException;
use Skyline\ImageCapture\Exception\MissingPackageException;
use Skyline\ImageCapture\Exception\NoUploadFileReceivedException;
use Skyline\ImageCapture\Exception\PreviewFileAlreadyExistsException;
use Skyline\ImageCapture\Exception\SourceFileAlreadyExistsException;
use Skyline\ImageCapture\Exception\UploadErrorException;
use Skyline\ImageTool\Render\ImageInterface;
use Skyline\ImageTool\Render\ImagePreviewRender;
use Skyline\ImageTool\Render\ImageTranslationRender;
use Skyline\ImageTool\Render\LocalImageRef;
use Symfony\Component\HttpFoundation\Request;

abstract class AbstractImageCaptureAPIActionController extends AbstractAPIActionController
{
	const UPLOAD_OPTION_SCALE_TO_BEST = 1;
	const UPLOAD_OPTION_RENDER_PREVIEW = 2;
	const UPLOAD_OPTION_MAKE_MAIN = 4;
	const UPLOAD_OPTION_RENDER_WATERMARK = 8;
	const UPLOAD_OPTION_APPLY_TRANSFORMATION = 16;


	protected function getDefaultRenderName(): ?string
	{
		return JSONRender::RENDER_NAME;
	}

	/**
	 * Override this method and forward to it after routing resolution.
	 */
	protected function mainImageCaptureAction() {
		/** @var Request $request */
		$request = $this->get("request");
		if($request->request->has("ic-ref") && !$this->acceptImageCaptureReference($request->request->get("ic-ref")))
			return;

		if($request->request->has("ic-delete")) {
			if(!$this->removeCapturedImage($request->get("ic-delete"), $request->get("ic-ref")))
				throw new DeleteImageException("Could not delete");
			return;
		}

		if(!$this->readFileRequest($request, $name, $type, $temp, $error))
			throw new NoUploadFileReceivedException("No upload file received");

		if($error)
			throw new UploadErrorException("Upload did fail", $error);

		$slug = $this->normalizeSlug( $request->get("ic-slug") ?: "" );
		$options = ($request->get("ic-options") ?: $this->getDefaultOptions()) | $this->getRequiredOptions();

		$original_path = $this->getOriginalImagesDirectory() . DIRECTORY_SEPARATOR . $slug;

		if(is_file($original_path)) {
			if($this->shouldOverwriteExistingFile($original_path))
				unlink($original_path);
			else
				throw new SourceFileAlreadyExistsException();
		}

		if($options & (static::UPLOAD_OPTION_SCALE_TO_BEST|static::UPLOAD_OPTION_RENDER_PREVIEW|static::UPLOAD_OPTION_APPLY_TRANSFORMATION)) {
			if(!class_exists(ImagePreviewRender::class))
				throw (new MissingPackageException("Package skyline/image-render-tool is missing", 0))->setPackage("skyline/image-render-tool");

			if(!$this->getDesiredRenderSpecifications($options, $maxImageSize, $maxPreviewSize, $fixOrientation, $watermark))
				throw (new MissingPackageException("Can not manipulate images because of missing desired image sizes", 1))->setPackage("skyline/image-render-tool");

			if($options & static::UPLOAD_OPTION_RENDER_PREVIEW) {
				$preview_path = $this->getPreviewImagesDirectory() . DIRECTORY_SEPARATOR . $slug;

				if(is_file($preview_path)) {
					if($this->shouldOverwriteExistingFile($preview_path))
						unlink($preview_path);
					else
						throw new PreviewFileAlreadyExistsException();
				}
			}
		}

		if(!move_uploaded_file($temp, $original_path))
			throw new UploadErrorException("Could not copy image to destination.", 500);

		try {
			$properties = $request->get("ic-props");
			if($properties)
				$properties = json_decode( $properties, true );

			if($options & self::UPLOAD_OPTION_APPLY_TRANSFORMATION) {
				list($tx, $ty) = $properties["translation"];
				$scale = $properties["scale"] * 1;
				list($fw, $fh) = $properties["frame"];

				if($fw && $fh) {
					$image = new LocalImageRef($original_path);
					$imageType = $image->getType();

					$gen = new ImageTranslationRender($fw, $fh);
					if(!$gen->renderTranslation($image, $tx, $ty, $scale))
						throw new ImageManipulationException("Could not apply transformation");
					$q = $imageType == ImageInterface::IMAGE_PNG ? 9 : ($imageType == ImageInterface::IMAGE_JPEG ? 75 : 0);
					@unlink($original_path);
					if(!$image->save($original_path, $q))
						throw new ImageManipulationException("Could not save the preview image", 401);
					unset($image);
				}
			}

			if($options & static::UPLOAD_OPTION_RENDER_PREVIEW) {
				$image = new LocalImageRef($original_path);
				$imageType = $image->getType();

				if($image->getWidth() > $maxPreviewSize || $image->getHeight() > $maxPreviewSize) {
					$gen = new ImagePreviewRender($maxPreviewSize);
					if(!$gen->generatePreview($image, $fixOrientation)) {
						throw new ImageManipulationException("Could not create preview from image");
					}
				}
				$q = $imageType == ImageInterface::IMAGE_PNG ? 9 : ($imageType == ImageInterface::IMAGE_JPEG ? 75 : 0);
				if(!$image->save($preview_path, $q))
					throw new ImageManipulationException("Could not save the preview image", 401);
				unset($image);
			}

			if($options & static::UPLOAD_OPTION_SCALE_TO_BEST) {
				$image = new LocalImageRef($original_path);
				$imageType = $image->getType();

				if($image->getWidth() > $maxImageSize || $image->getHeight() > $maxImageSize) {
					$gen = new ImagePreviewRender($maxImageSize);
					if(!$gen->generatePreview($image, $fixOrientation)) {
						throw new ImageManipulationException("Could not scale image to desired size");
					}
					$q = $imageType == ImageInterface::IMAGE_PNG ? 9 : ($imageType == ImageInterface::IMAGE_JPEG ? 75 : 0);
					@unlink($original_path);
					if(!$image->save($original_path, $q))
						throw new ImageManipulationException("Could not save the preview image", 401);
				}
				unset($image);
			}

			if($options & static::UPLOAD_OPTION_RENDER_WATERMARK && $watermark) {
				// TODO: Watermark render
			}

			if($num = $this->completeImageCaptureRequest($original_path, $preview_path ?? "", $slug, $options, $properties["caption"] ?: "", $properties["alt"] ?: "")) {
				$model = $this->getModel();

				$model["src"] = $this->getRequestURIForLocalPath($original_path, false);
				if(isset($preview_path))
					$model["pre"] = $this->getRequestURIForLocalPath($preview_path, true);

				$model["result"] = $num;
			} else
				throw new ImageCaptureException("Could not complete image capture request");
		} catch (\Throwable $exception) {
			if(is_file($original_path))
				unlink($original_path);
			if(isset($preview_path) && is_file($preview_path))
				unlink($preview_path);

			throw $exception;
		}
	}

	protected function readFileRequest(Request $request, &$name=NULL, &$type=NULL, &$temp=NULL, &$error=NULL, &$size=NULL): bool {
		$file = $request->files->get("ic-file");

		if($file) {
			$name = $file["name"];
			$type = $file["type"];
			$temp = $file["tmp_name"];
			$error = $file["error"]*1;
			$size = $file["size"]*1;
			return true;
		}
		return false;
	}

	protected function normalizeSlug(string $slug): string {
		return preg_replace("/[^a-z0-9\-_.]+/i", '-',  $slug);
	}

	/**
	 * Called to start the receiver process of a captured image.
	 * If this method returns false, the process gets stopped.
	 *
	 * @param $reference
	 * @return bool
	 */
	abstract protected function acceptImageCaptureReference($reference): bool;

	/**
	 * This method must return a valid root directory to put the uploaded images
	 *
	 * @return string
	 */
	abstract public function getOriginalImagesDirectory(): string;

	/**
	 * This method must return a valid root directory to put the generic preview images
	 *
	 * @return string
	 */
	abstract public function getPreviewImagesDirectory(): string;

	/**
	 * @param string $original_file
	 * @param string|null $preview_file
	 * @param string $slug
	 * @param int $options
	 * @param string|null $caption
	 * @param string|null $alternative
	 * @return int
	 */
	abstract protected function completeImageCaptureRequest(string $original_file, ?string $preview_file, string $slug, int $options, ?string $caption, ?string $alternative): int;

	abstract protected function removeCapturedImage(string $image, $reference): bool;

	protected function getDefaultOptions(): int {
		return 0;
	}

	protected function getRequiredOptions(): int {
		return self::UPLOAD_OPTION_SCALE_TO_BEST;
	}

	protected function shouldOverwriteExistingFile($file): bool {
		return false;
	}

	protected function getDesiredRenderSpecifications(int $options, &$maxImageSize, &$maxPreviewSize, &$fixOrientation, &$watermark): bool
	{
		$maxImageSize = 1920;
		$maxPreviewSize = 400;
		$fixOrientation = false;
		$watermark = false;
		return true;
	}

	protected function getRequestURIForLocalPath(string $image_path, bool $is_preview): ?string {
		return $is_preview ? "/Public/img/d/" . basename($image_path) : "/Public/img/" . basename($image_path);
	}
}