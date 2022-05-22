import './index.css'

const colors = [
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
  '#64748b',
]

const colorPicker = () => {
  const value = Math.floor(Math.random() * colors.length)
  return colors[value]
}

const PasswordItem = props => {
  const {
    eachWebsiteDetails,
    isPasswordsVisible,
    updatingTheListOfWebsiteDetail,
  } = props
  const {websiteName, userName, password, id} = eachWebsiteDetails

  const deletingTheItem = () => {
    updatingTheListOfWebsiteDetail(id)
  }

  return (
    <li className="list-item">
      <div className="profile-text-container">
        <p className="profile" style={{backgroundColor: colorPicker()}}>
          {websiteName[0].toUpperCase()}
        </p>
        <div className="detail-in-text-container">
          <p className="website-name">{websiteName}</p>
          <p className="user-name">{userName}</p>
          {isPasswordsVisible && <p className="shown-password">{password}</p>}
          {!isPasswordsVisible && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="password-stars"
            />
          )}
        </div>
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={deletingTheItem}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="bin-icon"
        />
      </button>
    </li>
  )
}

export default PasswordItem
