import React, { useState, useEffect } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// icons
import { Icon } from '@iconify/react';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import whatsappFilled from '@iconify/icons-ant-design/whats-app';
import internetFilled from '@iconify/icons-ant-design/global';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import PropTypes from 'prop-types';

const IconStyle = styled(Icon)(() => ({
  width: 25,
  height: 25,
  marginTop: 1,
  flexShrink: 0
}));

const fnIconNetwork = (name) => {
  switch (name) {
    case 'instagram':
      return <IconStyle icon={instagramFilled} color="#D7336D" />;
    case 'facebook':
      return <IconStyle icon={facebookFill} color="#1877F2" />;
    case 'whatsapp':
      return <IconStyle icon={whatsappFilled} color="#00E676" />;
    case 'twitter':
      return <IconStyle icon={twitterFill} color="#1C9CEA" />;
    case 'linkedin':
      return <IconStyle icon={linkedinFill} color="#006097" />;
    default:
      return <IconStyle icon={internetFilled} color="#999999" />;
  }
};

const propTypesNetwork = {
  data: PropTypes.shape({
    name: PropTypes.string,
    uri: PropTypes.string
  })
};

const Network = (props) => {
  const { data } = props;
  const [name, setName] = useState('');
  const [uri, setUri] = useState('');
  useEffect(() => {
    if (data) {
      setName(data.name);
      setUri(data.uri);
    }
  }, [data]);
  return (
    <div>
      {uri && (
        <a href={uri} rel="noopener noreferrer" target="_blank">
          {fnIconNetwork(name)}
        </a>
      )}
    </div>
  );
};

Network.propTypes = propTypesNetwork;

const propTypes = {
  network: PropTypes.arrayOf(PropTypes.shape({}))
};

const SocialNetwork = (props) => {
  const { network } = props;
  const [socialNetwork, setSocialNetwork] = useState([]);
  useEffect(() => {
    const SNParse = new Map();
    if (network && network.length > 0) {
      network.forEach((item) => {
        SNParse.set(item.name, { ...item });
      });
    }
    const socialKey = Array.from(SNParse.keys()).sort((a, b) => a - b);
    const sociales = socialKey.map((item) => SNParse.get(item));
    setSocialNetwork(sociales);
  }, [network]);
  return (
    <Stack
      spacing={1.5}
      direction="row"
      justifyContent={{ xs: 'center', md: 'flex-start' }}
      sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
    >
      {socialNetwork
        .filter((item) => item.uri)
        .map((item, index) => (
          <Network key={item._id || index} data={item} />
        ))}
    </Stack>
  );
};

SocialNetwork.propTypes = propTypes;

export default SocialNetwork;
