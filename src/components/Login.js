import React from "react";
import {
    TextField, Box, Paper, Typography
} from '@mui/material';
import { useDispatch } from 'react-redux'
import { loginOperation } from '../redux/MenuSlice'
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch()
    const [inputUserName, setInputUserName] = React.useState("");
    const [inputPassword, setInputPassword] = React.useState("");
    const [tokenStat, setTokenStat] = React.useState(false);
    const navigate = useNavigate();

    return (
        <Box sx={{
            flexGrow: 1, display: 'flex',
            justifyContent: 'center',
            flexFlow: "column",
            alignItems: "center",
            position: "absolute",
            right: "0",
            left: "0",
            top: "0",
            bottom: "0"
        }}>
            <div>
                <Paper elevation={10} sx={{
                    margin: "20px", padding: "16px", bgcolor: "#FAE8E0",
                    maxWidth: "300px", height: "270px"
                }}>
                    <Typography style={{
                        display: 'flex',
                        justifyContent: 'center', color: "#29A0B1", fontWeight: "bold"
                    }} variant="h6" gutterBottom>
                        Login
                    </Typography>
                    <div style={{ justifyContent: 'center', display: 'flex' }}>
                        <TextField
                            style={{ width: 400 }}
                            required
                            id="outlined-required"
                            label="User Name"
                            placeholder="User Name..."
                            value={inputUserName}
                            onInput={(e) => setInputUserName(e.target.value)}
                            onChange={(e) => setInputUserName(e.target.value)}
                        />
                    </div>
                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: "20px" }}>
                        <TextField
                            style={{ width: 400 }}
                            required
                            id="outlined-required"
                            label="Password"
                            placeholder="Password..."
                            value={inputPassword}
                            onInput={(e) => setInputPassword(e.target.value)}
                            onChange={(e) => setInputPassword(e.target.value)}
                        />
                    </div>
                    <div style={{ justifyContent: 'center', display: 'flex', marginTop: '20px' }}>
                        <IconButton disabled={inputUserName === "" || inputPassword === ""} aria-label="Add" style={{ border: '2px solid #B6E2D3', color: '#167D7F' }} onClick={() => {
                            dispatch(loginOperation({ name: inputUserName, pass: inputPassword })).then((result) => {
                                navigate(result.error ? "/login" : "/menu");
                                setTokenStat(result.error ? true : false);
                            });
                        }}>
                            <LoginIcon />
                        </IconButton>
                    </div>
                    <Paper sx={{
                        display: tokenStat ? 'flex' : 'none',
                        margin: "20px", padding: "10px", bgcolor: "#FAE8E0"
                    }}>
                        <div style={{
                            color: "#DF362D", fontWeight: "bold", justifyContent: 'center',
                            display: tokenStat ? 'flex' : 'none'
                        }}>
                            The login information is incorrect. Please check!
                        </div>
                    </Paper>

                </Paper>
            </div>
        </Box>
    )
}

export default Login