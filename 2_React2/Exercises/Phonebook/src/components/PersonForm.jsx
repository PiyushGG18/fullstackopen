const PersonForm = ({newName, newPhone, handleChange, handleNumChange, handleSubmit}) => {
    return (
      <form>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newPhone} onChange={handleNumChange} />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>add</button>
        </div>
      </form>
    )
}

export default PersonForm