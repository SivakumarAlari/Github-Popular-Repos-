import {Component} from 'react'
import Loader from 'react-loader-spinner'
import RepositoryItem from '../RepositoryItem'
import LanguageFilterItem from '../LanguageFilterItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatus = {
  onSuccess: 'SUCCESS',
  onLoading: 'LOADING',
  onFailure: 'FAILURE',
}

class GithubPopularRepos extends Component {
  state = {
    gitHubReposList: [],
    activeTabId: languageFiltersData[0].id,
    statusView: apiStatus.onLoading,
  }

  componentDidMount() {
    this.getGithubPopularList()
  }

  getGithubPopularList = async () => {
    const {activeTabId} = this.state
    this.setState({statusView: apiStatus.onLoading})
    const url = `https://apis.ccbp.in/popular-repos?language=${activeTabId}`

    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    const updatedData = data.popular_repos.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      issueCount: eachItem.issues_count, // Fixed "issueCout" to "issueCount"
      forksCount: eachItem.forks_count,
      starsCount: eachItem.stars_count,
      avatarUrl: eachItem.avatar_url,
    }))
    if (response.ok === true) {
      this.setState({
        gitHubReposList: updatedData,
        statusView: apiStatus.onSuccess,
      })
    } else {
      this.setState({statusView: apiStatus.onFailure})
    }
  }

  clickTheLanguageButton = id => {
    this.setState({activeTabId: id}, this.getGithubPopularList)
  }

  enterSuccessfully = () => {
    const {gitHubReposList} = this.state
    return (
      <ul className="filterRepository-container">
        {gitHubReposList.map(eachOne => (
          <RepositoryItem key={eachOne.id} gitHubReposList={eachOne} />
        ))}
      </ul>
    )
  }

  viewOnFailure = () => {
    return (
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          alt="failure view"
          className="failure-image"
        />
        <h className="failure-heading">Something Went Wrong </h>
      </div>
    )
  }

  loadingView = () => {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
      </div>
    )
  }

  getFinalOutputs = () => {
    const {statusView} = this.state

    switch (statusView) {
      case apiStatus.onSuccess:
        return this.enterSuccessfully()
      case apiStatus.onFailure:
        return this.viewOnFailure()
      case apiStatus.onLoading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <h1 className="popular-heading">Popular</h1>

        <div className="language-container">
          <ul className="container">
            {languageFiltersData.map(eachFilter => (
              <LanguageFilterItem
                key={eachFilter.id}
                languageDetails={eachFilter}
                clickTheLanguageButton1={this.clickTheLanguageButton}
              />
            ))}
          </ul>
        </div>

        <div>{this.getFinalOutputs()} </div>
      </div>
    )
  }
}

export default GithubPopularRepos

