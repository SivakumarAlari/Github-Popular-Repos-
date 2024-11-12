import './index.css'

const LanguageFilterItem = props => {
  const {languageDetails, clickTheLanguageButton1} = props
  const {id, language} = languageDetails
  const buttonClick = () => {
    clickTheLanguageButton1(id)
  }
  return (
    <li className="each-language-container">
      <button className="buttonDesign" type="button" onClick={buttonClick}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
