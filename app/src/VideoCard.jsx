import React , {useState} from "react";
import { Button, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toast'
// import { TikTokEmbed } from 'react-social-media-embed';
import axios from 'axios'
const VideoCard = () => {
    const [show,setShow] = useState(false)
    const [accessToken , setAcessToken] = useState('')
    const [accessTokenSecret,setAcessTokenSecret] = useState('')
    const handlePostTwitter = async () => {
        const res = await axios.post('http://localhost:4100/post',{url:'https://pizzap.io/video/pizzap.aigc.s1.mp4'})
        toast(res.data.error)
        // .catch(error => toast.error(error.response.data.error))
        // window.open(res.data.data,"_blank")
    }
    const handleLogin = async () => {
        const res = await axios.get('http://localhost:4100/auth/twitter')
        console.log(res)
        if(res.status.code === 200){
            setAcessToken(res.data.accessToken);
            setAcessTokenSecret(res.data.accessTokenSecret)
        }else{toast.error("Login Failed , Please try again!!!")}
    }
    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <ToastContainer position="top-right"/>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => setShow(true)}>Share</Button>
            <Button variant="contained" sx={{ width: '100px' }} onClick={handleLogin}>Login</Button>
            <Stack
                sx={{display:!show && 'none' , width: '50%', border: '1px solid purple', padding: '30px' }} spacing={6} justifyContent='center' alignSelf='center'
                >
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <h5>POST</h5>
                    <CloseIcon onClick={() => setShow(false)}/>
                </Stack>
                <TextField id="standard-basic" label="Standard" variant="standard" value='https://pizzap.io/video/pizzap.aigc.s1.mp4' />
                <video controls width="100%" height="360" >
                    <source src="https://pizzap.io/video/pizzap.aigc.s1.mp4"/>
                </video>
                {/* <EmbedToggler defaultToggledOn> */}
                    {/* <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    >
                        <TikTokEmbed
                            url="https://www.tiktok.com/@tiagogreis/video/6830059644233223429"
                            width={325}
                        />
                    </div> */}
                {/* </EmbedToggler> */}
                <Button variant="contained" sx={{ width: '100px' }} onClick={handlePostTwitter}>Post</Button>
            </Stack>
        </Stack>
    )
}

export default VideoCard;