import React from 'react';
import { FilePicker } from 'react-file-picker'
import { Button ,Alert} from 'react-bootstrap'
import "./CssComponents/Excel.css";
import swal from 'sweetalert2';

const FilePickerNLabel = ({parse=f=>f,me}) =>
  <div>
      <FilePicker
      extensions={['xlsx']}
      onChange={FileObject => parse(FileObject,me)}
      onError={(errMsg) => {
          swal({
              title: 'FORMATO DEL ARCHIVO INVALIDO, SOLO .XLSX',
              animation: false,
              showConfirmButton: false,
              timer: 2000,
              type:'error',
          })
      }}
        >
          <Button bsStyle="primary" className="btn_escoger">
              Escoger excel
          </Button>
        </FilePicker>
  </div>

export default FilePickerNLabel
