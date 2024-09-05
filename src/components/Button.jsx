import './index.scss'

function AppButtton({disabled,title, onClick}){
    return(
        <div>
        <button style={{borderColor: disabled && "#a1a3a1"}} disabled={disabled} className="theme-btn" onClick={onClick}>
            {title}
        </button>
        </div>
    )
}
export default AppButtton