import axios from 'axios';
import React, {useState} from 'react'

const ImageUpload = () => {

    const [fileInputState, setFileInputState] = useState('');
    const [selectedFile, setSelectedFile] = useState(false);
    const [previewSource, setPreviewSource] = useState('');

const handleFileUpload = (e) =>{
    e.preventDefault();
    const file = e.target.files[0];
    previewFile(file);
}

const previewFile = (file) => {
    const reader = new FileReader();
    // console.log(reader)
    reader.onload = () => { setPreviewSource(reader.result) }
    if(file){
        reader.readAsDataURL(file);
        setSelectedFile(true)
    }
}

const handleSubmitFile = (e) => {
    e.preventDefault();
    if(selectedFile)
        uploadImage(previewSource);
    else
        console.log("No file is selected")
}

const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage)

    try {
        let body = {data:base64EncodedImage}
        console.log(body.data)
        await axios.post('/travel/exps/imagepost', body)
    } catch (error) {
        console.error(error)
    }
}

  return (
    <div className='container'>
     <h1>Upload</h1>
     <form onSubmit={ handleSubmitFile }>
         <input type="file" name='image' onChange={ handleFileUpload } value={ fileInputState } />
         <button type='submit' className='btn btn-success'>Submit</button>
     </form>
     {previewSource ? <img src={ previewSource } style={{height: '200px', width: '300px'}}/> : "No image selected"}
    </div>
  )
}

export default ImageUpload