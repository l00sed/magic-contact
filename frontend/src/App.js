import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './assets/styles/App.css';
import PhotoCameraRoundedIcon from "@material-ui/icons/PhotoCameraRounded";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    textAlign: 'center',
  },
  imgBox: {
    maxWidth: "80%",
    margin: "auto",
  },
  img: {
    height: "inherit",
    maxWidth: "inherit",
  },
  input: {
    display: "none"
  }
}));

function App() {
  const classes = useStyles();
  const [source, setSource] = useState("");
  const formData = new FormData();
  const [imageText, setImageText] = useState("");
  const handleConversion = async (filename) => {
    // If successfully uploaded, get the image's text content
    try {
      axios({
        method: 'POST',
        url: 'http://192.168.0.104:8000/api/get_image_text/',
        data: { 'filename': filename },
        headers: {
          'content-type': 'application/json'
        },
      }).then((res) => {
        if (res.status === 200) {
          console.log(res.data.image_text);
          setImageText(res.data.image_text);
        }
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  const handleCapture = async (target) => {
    if (target.files) {
      if (target.files.length !== 0) {
        const file = target.files[0];
        const tempURL = URL.createObjectURL(file);
        setSource(tempURL);
        formData.append('name', 'File');
        formData.append('image', file);
        // Upload the image
        try {
          axios({
            method: 'POST',
            url: 'http://192.168.0.104:8000/api/upload/',
            data: formData,
            headers: {
              'content-type': 'multipart/form-data'
            },
          }).then((res) => {
            handleConversion(res.data.filename);
          });
        } catch (err) {
          console.log(err.message);
        }
      }
    }
  };

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <h5>Capture your image</h5>
          {
          source &&
            <Box display="flex" justifyContent="center" border={1} className={classes.imgBox}>
              <img src={source} alt={"snap"} className={classes.img}></img>
            </Box>
          }
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            capture="environment"
            onChange={(e) => handleCapture(e.target)}
          />
          <label htmlFor="icon-button-file">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <PhotoCameraRoundedIcon fontSize="large" color="primary" />
            </IconButton>
          </label>
          <p>{imageText}</p>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
