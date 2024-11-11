// 3rd party
import { Controller } from "react-hook-form";
import { Form, Image } from "react-bootstrap";

// custom hook
import useAppContext from "../../hooks/useAppContext";

/**
 * From controller used from React hook form
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const MapToFormController = (props) => {
  // props
  const { name, type, formValidation, placeholder } = props;
  const { control, errors, register, disabled = false } = props;

  // state store
  const { forms } = useAppContext();
  const { err, view } = forms;

  // fetches images from a view object in state store
  const { profile_picture, image } = view;

  // switch between profile_picture or image depending on if profile_picture is undefined
  const img = profile_picture === undefined ? image : profile_picture;

  // convert to base64 string
  const getBase64 = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  // image handler
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
        // if image this is run
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
                placeholder={placeholder}
                autoFocus={true}
                name={name}
              />
            )}
          />
        </Form.Group>
      ) : (
        // if not, an image run this
        <Form.Group className="mb-3" controlId={name}>
          <Form.Label column={true}>{name}</Form.Label>
          <Controller
            name={name}
            control={control}
            render={() => (
              <Form.Control
                type={type}
                {...register(name, formValidation)}
                placeholder={placeholder}
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
