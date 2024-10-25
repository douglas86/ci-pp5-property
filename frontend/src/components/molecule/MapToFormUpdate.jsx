import { Controller } from "react-hook-form";
import Form from "react-bootstrap/Form";
import useAppContext from "../../hooks/useAppContext";
import Image from "react-bootstrap/Image";

const MapToFormUpdate = (props) => {
  // props
  const { name, type, formValidation } = props;
  const { control, errors, register } = props;

  // state store
  const { forms } = useAppContext();
  const { err, view } = forms;
  const { profile_picture } = view;

  return (
    <>
      {type === "file" ? (
        // if not, an image run this
        <Form.Group className="mb-3" controlId={name}>
          <Form.Label column={true}>{name}</Form.Label>
          <Image src={profile_picture} width={50} height={50} rounded={true} />
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Form.Control
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
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

export default MapToFormUpdate;
