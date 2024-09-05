import { useDropzone } from 'react-dropzone'
import './index.scss'

function DropZone({ text, onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  return (
    <div className='drop-zone' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        <div >
          {text}
        </div>
      }
    </div>
  )
}
export default DropZone;