const BlogSearchBar = (props) => {
    const { searchValue, setSearchValue } = props;
    return (
        <div className="blog-search-bar-container">
            <input className="blog-search-bar input" placeholder='Tìm bài viết' value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value);
            }} />
        </div>
    );
};
export default BlogSearchBar;