import logo from "./logo.svg";

function Layout(){
    return (
        <div className="App bg-violet-500">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p className="text-amber-400">
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    )
}

export default Layout