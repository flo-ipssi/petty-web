import React, { FC, useCallback, useState } from 'react';
import './ImageCropper.scss';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../../../helpers/cropImage';
import { Modal, Button, Slider, makeStyles } from '@material-ui/core';
import axios from 'axios';
import { Keys, getFromAsyncStorage } from '../../../utils/asyncStorage';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, updateAvatar, updateBusyState } from '../../../store/auth';
import Loader from '../../Loader';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    position: 'relative',
    width: '80%',
    height: '80%',
  },
  cropContainer: {
    position: 'relative',
    width: '100%',
    height: '70%',
    background: '#333',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '10px',
  },
}));

interface ImageCropperProps { 
  onUploadSuccess?(): any
}

const ImageCropper: FC<ImageCropperProps> = ( {onUploadSuccess } ) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { busy } = useSelector(getAuthState);
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(1 / 1); // Default aspect ratio

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setOpen(true);
    }
  };

  const readFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result));
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const uploadCroppedImage = async () => {
    dispatch(updateBusyState(true));
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      const formData = new FormData();
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      formData.append('upload', croppedImage, 'cropped-image.jpg');
      const response = await axios.post('http://localhost:8989/upload/create/User', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: "Bearer " + token
        },
      });
      dispatch(updateAvatar(response.data.result));
      if (onUploadSuccess) {
        onUploadSuccess(response.data.result);
      }
      console.log('Image uploaded successfully:', response);
    } catch (e) {
      console.error('Error uploading image:', e);
    } finally {
      setOpen(false);
    }
    dispatch(updateBusyState(false));
  };
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => document.getElementById('fileInput').click()}>
        Changer la photo
      </Button>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        className={classes.modal}
      >
        {busy ? <Loader /> :
        <div className={classes.paper}>
          <div className={classes.cropContainer}>
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>
          <div className={classes.controls}>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e, zoom) => setZoom(zoom)}
            />
            <Button variant="contained" color="secondary" onClick={uploadCroppedImage}>
              Save
            </Button>
          </div>
        </div> }
      </Modal>
    </div>
  )
};

export default ImageCropper;
