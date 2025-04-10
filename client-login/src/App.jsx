import "./App.css"

function App() {
  return (
    <div id="body">
      <header>
        <h1 id="title">Clever</h1>
        <div id="logo"></div>

      </header>
      <main>
        <div id="computerImg"></div>
        <div id="sloganLoginContainer">
          <h2 id="slogan">Organiza, comunica, aprende, <br/> Todo en un solo lugar.</h2>
          <div id="loginRegisterContainer">
            <button className="loginButton" id="loginButton">Crear cuenta</button>
            <button className="loginButton" id="registerButton">Iniciar sesión</button>
          </div>
        </div>
      </main>

    </div>
  )
}

export default App

