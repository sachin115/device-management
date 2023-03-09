import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from '../Layouts/Layout';
import { Box } from '@mui/system';

function Pending() {

    const [device, setDevice] = useState();
    useEffect(async () => {
        let result = await axios.get('/pending_acknowledgment');
        setDevice(result)
        }, []);
    return (
        <><Layout />
            <div>
            <Box ml={35} mr={4} pt={1} width={400} >No Pending Acknowledgement</Box>
            </div>
        </>
    );
}

export default Pending;