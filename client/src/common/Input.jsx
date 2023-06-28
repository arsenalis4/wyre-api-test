export function Input(props){
    const { name, label, value, onChange, error } = props
    return(
        <input name={name} value={value} onChange={onChange} placeholder={label} />
    )
}