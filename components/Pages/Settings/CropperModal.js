import React, { useState, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useDispatch } from "react-redux";
import { dataURLtoFile } from "helpers";

const CropperModal = ({ show, handleClose, newImage }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [cropData, setCropData] = useState(null);
  const [cropper, setCropper] = useState();

  useEffect(() => {
    if (newImage.image) {
      setImage(newImage.image);
    }
  }, [newImage]);

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      var file = dataURLtoFile(
        cropper.getCroppedCanvas().toDataURL(),
        Math.random().toString(36) + newImage.name
      );
      // dispatch(updateUserPicture(file));
      handleClose();
    }
  };

  if (!show) {
    return <></>;
  }
  return (
    <div className={` fixed z-10 inset-0 overflow-y-auto`}>
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <Cropper
              style={{ height: 400, width: "100%" }}
              initialAspectRatio={1}
              preview=".img-preview"
              src={image}
              viewMode={1}
              aspectRatio={1}
              guides={true}
              minCropBoxHeight={10}
              minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
          </div>
          <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <button
              onClick={getCropData}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-teal-500 to-orange-600 hover:from-teal-600 hover:to-orange-700 text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:col-start-2 sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:mt-0 sm:col-start-1 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropperModal;
