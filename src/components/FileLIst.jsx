import { CiFileOn } from "react-icons/ci";
import DropZone from "./DropZone";
import { FiPlus } from "react-icons/fi";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaFilePdf } from "react-icons/fa6";




function FileList({ files, onDrop }) {
    return (
        <div className="file-list">
            {files.map((v, i) => {
                let icon;
                switch (v.type) {
                    case "text/html":
                        icon = <FaHtml5 />
                        break
                    case "text/css":
                        icon = <FaCss3Alt />
                        break
                    case "text/javascript":
                        icon = <IoLogoJavascript />
                        break
                    case "application/pdf":
                        icon = <FaFilePdf />
                        break
                    default:
                        icon = <CiFileOn />

                }

                return (
                    <div key={i}>
                        {v.type.indexOf("image") !== -1 ? <img className="list-img" src={URL.createObjectURL(v)} />
                            :
                            <>
                                {icon}
                                <span className="file-name">{v.name.slice(0, 10)}<b>{v.name.slice(v.name.lastIndexOf("."))}</b></span>
                            </>
                        }
                    </div>
                )
            })
            }
            <div>
                <DropZone onDrop={onDrop} text={
                    <span className="add-more-files">
                        <FiPlus />
                        <p>Add File</p>
                        <span>(Upto 5 MB)</span>
                    </span>
                } />
            </div>
        </div>
    )
}
export default FileList