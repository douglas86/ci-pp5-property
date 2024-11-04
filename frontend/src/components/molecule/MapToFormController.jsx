import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import useAppContext from "../../hooks/useAppContext";
import Image from "react-bootstrap/Image";

const MapToFormController = (props) => {
  // props
  const { name, type, formValidation } = props;
  const { control, errors, register, disabled = false } = props;

  // state store
  const { forms } = useAppContext();
  const { err, view } = forms;
  // rename profile_picture to image
  const { profile_picture, image } = view;

  const img = profile_picture === undefined ? image : profile_picture;

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  const handleImage = async (event, field) => {
    let file = event.target.files[0];

    if (file) {
      const base64String = await getBase64(file);
      field.onChange(base64String);
    }
  };

  return (
    <>
      {type === "file" ? (
        // if not, an image run this
        <Form.Group className="mb-3" controlId={name}>
          <Form.Label column={true}>{name}</Form.Label>
          {img ? (
            <Image src={img} width={50} height={50} rounded={true} />
          ) : null}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Form.Control
                type="file"
                onChange={(e) => handleImage(e, field)}
                autoFocus={true}
                name={name}
              />
            )}
          />
        </Form.Group>
      ) : (
        // if image run this
        <Form.Group className="mb-3" controlId={name}>
          <Form.Label column={true}>{name}</Form.Label>
          <Controller
            name={name}
            control={control}
            render={() => (
              <Form.Control
                type={type}
                {...register(name, formValidation)}
                autoFocus={true}
                name={name}
                disabled={disabled}
              />
            )}
          />

          {/*show an error message*/}
          {/*from React hook form*/}
          {errors[name] && (
            <p className="text-danger">{errors[name].message}</p>
          )}
          {/*from server*/}
          {err[name] && <p className="text-danger">{err[name]}</p>}
        </Form.Group>
      )}
    </>
  );
};

export default MapToFormController;
