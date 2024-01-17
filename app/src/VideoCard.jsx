import React , {useState} from "react";
import { Button, Stack, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
// import { TikTokEmbed } from 'react-social-media-embed';
import axios from 'axios'
const VideoCard = () => {
    const [show,setShow] = useState(false)
    const handlePostTwitter = async () => {
        console.log('aaa')
        const res = await axios.post('http://localhost:4100/post',{url:'https://pizzap.io/video/pizzap.aigc.s1.mp4'})
        window.open(res.data.data,"_blank")
    }
    return (
        <Stack sx={{ width: '100%', height: '100%' }}>
            <Button variant="contained" sx={{ width: '100px' }} onClick={() => setShow(true)}>Share</Button>
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