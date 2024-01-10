function Checkbox({title,status,onChange,index}) {

    return (
        <div>
            <input
                type="checkbox"
                id={index}
                onChange={onChange}
                checked={status}
            />
            <label htmlFor={index}>{title}</label>
        </div>
    )
}

export default Checkbox;