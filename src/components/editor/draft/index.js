import PropTypes from 'prop-types';
import { Editor } from 'react-draft-wysiwyg';
//
import { toolbarFull, toolbarSimple } from './DraftEditorToolbar';
import DraftEditorStyle from './DraftEditorStyle';

// ----------------------------------------------------------------------

DraftEditor.propTypes = {
  simple: PropTypes.bool,
  error: PropTypes.bool,
  placeHolder: PropTypes.string,
  sx: PropTypes.object
};

export default function DraftEditor({ simple = false, error, sx, placeHolder, ...other }) {
  return (
    <DraftEditorStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`
        }),
        ...sx
      }}
    >
      <Editor toolbar={simple ? toolbarSimple : toolbarFull} placeholder={placeHolder} {...other} />
    </DraftEditorStyle>
  );
}
