import * as Ons from "react-onsenui"
import React, { useState, useEffect, useContext } from "react"
import User from "./User";

export const UserContext = React.createContext(null)
export function useUser() {
    return useContext(UserContext)
}


function Auth({ setUser }) {
    const [tabbarIndex, setTabbarIndex] = useState(0);

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const [loginError, setLoginError] = useState(null)
    const [registerError, setRegisterError] = useState(null)

    const handleLogin = () => {
        setLoading(true)
        fetch("/api/access/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            setLoading(false)
            if (response.status == 200) {
                response.json().then(({ user }) => setUser(user))
            } else if (response.status == 404 || response.status == 401) {
                setPassword("")
                setLoginError("Zły login i/lub hasło.")
            } else {
                setLoginError("Wewnętrzny błąd serwera.")
            }
        }).catch(() => {
            setLoading(false)
            setLoginError("Błąd połączenia.")
        })
    }
    const handleRegister = () => {
        if (username.length == 0) {
            // TODO: check this server side
            setRegisterError("Nazwa użytkownika nie może pyć pusta.")
            return
        }
        if (password.length < 8) {
            // TODO: check this server side
            setRegisterError("Hasło musi mieć minimum 8 znaków.")
            return
        }
        if (password != repeatPassword) {
            setRegisterError("Podane hasła różnią się.")
            return
        }
        setLoading(true)

        fetch("/api/access/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((response) => {
            setLoading(false)
            if (response.status == 200) {
                response.json().then(user => setUser(user))
            } else if (response.status == 422) {
                setRegisterError("Nazwa użytkownika zajęta.")
            } else {
                setRegisterError("Wewnętrzny błąd serwera.")
            }
        }).catch(() => {
            setLoading(false)
            setRegisterError("Błąd połączenia.")
        })
    }

    return <Ons.Tabbar
        onPreChange={(hmm) => console.log(hmm) || setTabbarIndex(hmm.index)}
        index={tabbarIndex}
        position='bottom'
        renderTabs={(activeIndex, tabbar) => [
            {
                content: <Ons.Page>
                    <div style={{ padding: "2em" }}>
                        <h1>Logowanie</h1>
                        <form style={{ paddingTop: "1em" }}>
                            <p>
                                <Ons.Input
                                    type="text" placeholder="Nazwa użytkownika" float autoFocus style={{ width: "100%" }}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    disabled={loading} />
                            </p>
                            <p style={{ paddingTop: "1em", paddingBottom: "0.5em" }}>
                                <Ons.Input type="password" placeholder="Hasło" float autoFocus style={{ width: "100%" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    disabled={loading} />
                            </p>
                            {loginError && <p style={{ textAlign: "center", color: "#aa0000", fontSize: "0.9em" }}>
                                {loginError}
                            </p>}
                            <p style={{ paddingTop: ".5em", textAlign: "center" }}>
                                <Ons.Button onClick={handleLogin} disabled={loading}>Zaloguj</Ons.Button>
                            </p>

                        </form>
                    </div>
                </Ons.Page>,
                tab: <Ons.Tab label="Logowanie" icon="fa-sign-in-alt" />
            },

            {
                content: <Ons.Page>
                    <div style={{ padding: "2em" }}>
                        <h1>Rejestracja</h1>
                        <form style={{ paddingTop: "1em" }}>
                            <p>
                                <Ons.Input type="text" placeholder="Nazwa użytkownika" float autoFocus style={{ width: "100%" }}
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    disabled={loading} />
                            </p>
                            <p style={{ paddingTop: "1em" }}>
                                <Ons.Input type="password" placeholder="Hasło" float autoFocus style={{ width: "100%" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    disabled={loading} />
                            </p>
                            <p style={{ paddingTop: "1em", paddingBottom: ".5em" }}>
                                <Ons.Input type="password" placeholder="Powtórz hasło" float autoFocus style={{ width: "100%" }}
                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                    value={repeatPassword}
                                    disabled={loading} />
                            </p>
                            {registerError && <p style={{ textAlign: "center", color: "#aa0000", fontSize: "0.9em" }}>
                                {registerError}
                            </p>}
                            <p style={{ paddingTop: ".5em", textAlign: "center" }}>
                                <Ons.Button onClick={handleRegister}
                                    disabled={loading}>Zarejestruj</Ons.Button>
                            </p>
                        </form>
                    </div>
                </Ons.Page>,
                tab: <Ons.Tab label="Rejestracja" icon="fa-user-plus" />
            },


        ]} />
}
export default Auth;