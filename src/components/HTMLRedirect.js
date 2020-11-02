function HTMLRedirect ({ url }) {
  return (
    <div>
      <div>
        Please wait to be redirected.
      </div>
      <span
        className='text-gray-light small'
      >
        Click <a href={url}>here</a> if you have been staring at this message for 10 seconds.
      </span>
    </div>
  );
}

export default HTMLRedirect;
