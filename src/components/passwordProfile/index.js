import './index.css'

const passwordImg =
  'https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png'

const PasswordProfile = props => {
  const {profileDetails, isShowPassword, deleteProfile} = props
  const {website, username, password, id} = profileDetails

  const onDeleteProfile = () => {
    deleteProfile(id)
  }

  return (
    <li className="profile-card">
      <div className="initial-div">
        <p>{website.slice(0, 1).toUpperCase()}</p>
      </div>
      <div className="details-div">
        <p>{website}</p>
        <p>{username}</p>
        {isShowPassword ? (
          <p className="password">{password}</p>
        ) : (
          <img src={passwordImg} alt="stars" className="stars" />
        )}
      </div>
      <button
        type="button"
        className="delete-btn"
        onClick={onDeleteProfile}
        testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordProfile
