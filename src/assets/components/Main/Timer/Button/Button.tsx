import './Button.css'

interface ButtonProps {
    title: string;
    onClick?: () => void;
}

function Button( {title,onClick}:ButtonProps) {
    return(
    <button className="button" onClick={onClick}>{title}</button>
    )
}

export default Button
