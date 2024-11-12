import './index.css'

const RepositoryItem = props => {
  const {gitHubReposList, isLoading} = props
  const {id, name, issueCount, forksCount, starsCount, avatarUrl} =
    gitHubReposList

  return (
    <>
      <li key={id} className="eachImageContainer">
        <div className="avatarNameContainer">
          <img src={avatarUrl} alt={name} className="avatarImageDesign" />
          <h1 className="name">{name}</h1>
        </div>
        <div className="bottomPart-container ">
          <div className="star-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
              alt="stars"
              className="starsImage"
            />
            <p className="starCount-paragraph">{starsCount} stars</p>
          </div>
          <div className="star-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
              alt="forks"
              className="forksImage"
            />
            <p className="starCount-paragraph">{forksCount} forks</p>
          </div>
          <div className="star-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
              alt="open issues"
              className="issueImage"
            />
            <p className="starCount-paragraph">{issueCount} open issues</p>
          </div>
        </div>
      </li>
    </>
  )
}

export default RepositoryItem
