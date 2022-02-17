import './index.css'
import {Component} from 'react'
import {v4} from 'uuid'
import PasswordProfile from '../passwordProfile'

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    showPassword: false,
    passwordList: [],
    searchInput: '',
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: v4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onDeleteProfile = id => {
    const {passwordList} = this.state

    this.setState({
      passwordList: passwordList.filter(password => password.id !== id),
    })
  }

  getSearchResults = () => {
    const {passwordList, searchInput} = this.state
    const searchResults = passwordList.filter(eachProfile =>
      eachProfile.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return searchResults
  }

  render() {
    const {
      showPassword,
      websiteInput,
      usernameInput,
      passwordInput,
    } = this.state
    const passwordsList = this.getSearchResults()
    const noPasswords = passwordsList.length === 0
    return (
      <div className="app-container">
        <div className="main-logo-div">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="main-logo"
          />
        </div>
        <div className="form-container">
          <form className="form" onSubmit={this.onAddPassword}>
            <h1 className="form-heading">Add New Password</h1>
            <div className="website-input input-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
              />
              <input
                type="text"
                onChange={this.onChangeWebsite}
                placeholder="Enter Website"
                value={websiteInput}
              />
            </div>

            <div className="username-input input-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
              />
              <input
                type="text"
                onChange={this.onChangeUsername}
                placeholder="Enter Username"
                value={usernameInput}
              />
            </div>

            <div className="password-input input-div">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
              />
              <input
                type="password"
                onChange={this.onChangePassword}
                placeholder="Enter Password"
                value={passwordInput}
              />
            </div>

            <button type="submit" className="submit-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="banner-img"
          />
        </div>
        <div className="password-display-container">
          <div className="search-bar">
            <h1 className="search-bar-heading">Your Passwords</h1>
            <div className="search-bar-input">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                type="search"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <div className="show-password-div">
            <input
              type="checkbox"
              id="show-password"
              onChange={this.onShowPassword}
            />
            <label htmlFor="show-password">Show Passwords</label>
          </div>
          <div className="password-profiles">
            {noPasswords ? (
              <div className="noPassword-div">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="no-password-para">No Passwords</p>
              </div>
            ) : (
              <ul className="passwords-list">
                {passwordsList.map(eachProfile => (
                  <PasswordProfile
                    key={eachProfile.id}
                    profileDetails={eachProfile}
                    isShowPassword={showPassword}
                    deleteProfile={this.onDeleteProfile}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
