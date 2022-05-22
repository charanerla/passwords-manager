import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteName: '',
    userName: '',
    password: '',
    listOfWebsitesWithPasswords: [],
    isPasswordsVisible: false,
    searchValue: '',
  }

  updateWebsiteName = event => {
    const enteredValue = event.target.value
    this.setState({websiteName: enteredValue})
  }

  updateUserName = event => {
    const enteredValue = event.target.value
    this.setState({userName: enteredValue})
  }

  updatePassword = event => {
    const enteredValue = event.target.value
    this.setState({password: enteredValue})
  }

  updateIsPasswordVisible = () => {
    this.setState(prevState => ({
      isPasswordsVisible: !prevState.isPasswordsVisible,
    }))
  }

  updatingTheListOfWebsiteDetail = id => {
    const {listOfWebsitesWithPasswords} = this.state
    const updatedList = listOfWebsitesWithPasswords.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({listOfWebsitesWithPasswords: updatedList})
  }

  submittingTheForm = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    if (websiteName !== '' && userName !== '' && password !== '') {
      const websiteDetails = {
        websiteName,
        userName,
        password,
        id: uuidv4(),
      }
      this.setState(prevState => ({
        listOfWebsitesWithPasswords: [
          ...prevState.listOfWebsitesWithPasswords,
          websiteDetails,
        ],
        websiteName: '',
        userName: '',
        password: '',
      }))
    }
  }

  showNoPasswordsImage = () => (
    <div className="no-passwords-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-passwords-img"
      />
      <p className="no-passwords-text">No Passwords</p>
    </div>
  )

  displayUnorderedListOfWebsites = updatedListOfWebsitesWithPasswords => {
    const {isPasswordsVisible} = this.state

    return (
      <ul className="unOrdered-list">
        {updatedListOfWebsitesWithPasswords.map(eachDetails => (
          <PasswordItem
            key={uuidv4()}
            eachWebsiteDetails={eachDetails}
            isPasswordsVisible={isPasswordsVisible}
            updatingTheListOfWebsiteDetail={this.updatingTheListOfWebsiteDetail}
          />
        ))}
      </ul>
    )
  }

  renderingTheInputsContainer = () => {
    const {websiteName, userName, password} = this.state

    return (
      <div className="form-img-container">
        <form className="form-container" onSubmit={this.submittingTheForm}>
          <h1 className="form-heading">Add New Password</h1>
          <div className="fields-container">
            <div className="fields-img-container">
              <img
                alt="website"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="input-logos"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Website"
              className="input-fields"
              value={websiteName}
              onChange={this.updateWebsiteName}
            />
          </div>
          <div className="fields-container">
            <div className="fields-img-container">
              <img
                alt="username"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="input-logos"
              />
            </div>
            <input
              type="text"
              placeholder="Enter Username"
              className="input-fields"
              value={userName}
              onChange={this.updateUserName}
            />
          </div>
          <div className="fields-container">
            <div className="fields-img-container">
              <img
                alt="password"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="input-logos"
              />
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              className="input-fields"
              value={password}
              onChange={this.updatePassword}
            />
          </div>
          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
          className="small-password-logo"
          alt="password manager"
        />
        <img
          className="large-password-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
          alt="password manager"
        />
      </div>
    )
  }

  updateTheWebsitesListToBeDisplay = event => {
    const searchInput = event.target.value.toLowerCase()
    this.setState({searchValue: searchInput})
  }

  newUpdatedListOfWebsites = () => {
    const {listOfWebsitesWithPasswords, searchValue} = this.state
    const newList = listOfWebsitesWithPasswords.filter(eachDetails =>
      eachDetails.websiteName.toLowerCase().includes(searchValue),
    )
    return newList
  }

  renderThePasswordsContainer = () => {
    const {searchValue} = this.state

    const updatedListOfWebsitesWithPasswords = this.newUpdatedListOfWebsites()

    return (
      <div className="list-of-header-passwords-container">
        <div className="header-container">
          <div className="header-name-count-container">
            <h1 className="header-name">Your Passwords</h1>
            <p className="counter">
              {updatedListOfWebsitesWithPasswords.length}
            </p>
          </div>
          <div className="search-img-search-input-element-container">
            <div className="search-icon-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-img"
              />
            </div>
            <input
              type="search"
              className="search-input-element"
              placeholder="Search"
              value={searchValue}
              onChange={this.updateTheWebsitesListToBeDisplay}
            />
          </div>
        </div>
        <div className="checkbox-label-container">
          <input
            type="checkbox"
            id="checkBox1"
            name="check1"
            onChange={this.updateIsPasswordVisible}
          />
          <label htmlFor="checkBox1" className="check-box-label">
            Show Passwords
          </label>
        </div>
        <div className="list-of-websites-or-null-container">
          {updatedListOfWebsitesWithPasswords.length > 0
            ? this.displayUnorderedListOfWebsites(
                updatedListOfWebsitesWithPasswords,
              )
            : this.showNoPasswordsImage()}
        </div>
      </div>
    )
  }

  render() {
    const {listOfWebsitesWithPasswords, isPasswordsVisible} = this.state
    console.log(isPasswordsVisible)
    console.log(listOfWebsitesWithPasswords)

    return (
      <div className="password-manager-app-container">
        <div className="elements-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
          {this.renderingTheInputsContainer()}
          {this.renderThePasswordsContainer()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
