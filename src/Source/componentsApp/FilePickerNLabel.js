import React from 'react';
import { FilePicker } from 'react-file-picker'
import { Button ,Alert} from 'react-bootstrap'
import "./CssComponents/Excel.css";

const FilePickerNLabel = ({parse=f=>f,me}) =>
  <div>
      <FilePicker
      extensions={['xlsx']}
      onChange={FileObject => parse(FileObject,me)}
      onError={(errMsg) => console.log(errMsg)}
        >
          <Button bsStyle="primary" className="btn_escoger">
              Escoger excel
          </Button>
        </FilePicker>
  </div>

export default FilePickerNLabel
