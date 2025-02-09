import Swal from "sweetalert2";

const SwalAlert = (icon, title, text) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};

export default SwalAlert;
