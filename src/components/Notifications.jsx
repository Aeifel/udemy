import { toast } from 'react-toastify';

const toastNotificationOptions = {
   className: 'toastWrapper',
   bodyClassName: 'toastBody',
   progressClassName: 'toastProgress',
   position: toast.POSITION.TOP_RIGHT,
   autoClose: 3000,
   theme: 'light',
   pauseOnHover: true,
};

export const showErrorToastNotification = (message) => {
   toast.error(message || 'Server Error', toastNotificationOptions);
};

export const showSuccessToastNotification = (message) => {
   toast.success(message || 'Success', toastNotificationOptions);
};

export const showWarnToastNotification = (message) => {
   toast.warn(message || 'Warning', toastNotificationOptions);
};
