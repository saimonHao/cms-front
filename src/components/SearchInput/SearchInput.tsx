import { useTranslation } from "react-i18next";
const SearchInput = ({ searchKey, handleSearch }) => {
    const { t } = useTranslation();
    return (
        <div className="search-box me-2 mb-2 d-inline-block">
            <div className="position-relative">
                <label
                    htmlFor="search-bar-0"
                    className="search-label"
                >
                    <input
                        id="search-bar-0"
                        type="text"
                        aria-labelledby="search-bar-0-label"
                        className="form-control "
                        placeholder={t('Search')}
                        name="searchKey"
                        defaultValue={searchKey}
                        onKeyDown={(e) => handleSearch(e)}
                    />
                </label>
                <i className="bx bx-search-alt search-icon" />
            </div>
        </div>
    )
}
export default SearchInput;