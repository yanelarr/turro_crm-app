export default function View({profile}) {
  return (
    <div className="tab-content pt-2">
      <div
        className="tab-pane fade show active profile-overview"
        id="profile-overview"
      >
        <h5 className="card-title">Detalles del Pérfil</h5>

        <div className="row">
          <div className="col-lg-3 col-md-4 label ">Nombre</div>
          <div className="col-lg-9 col-md-8">{profile.fullname}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Cargo</div>
          <div className="col-lg-9 col-md-8">{profile.job}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Teléfono</div>
          <div className="col-lg-9 col-md-8">{profile.phone}</div>
        </div>

        <div className="row">
          <div className="col-lg-3 col-md-4 label">Correo</div>
          <div className="col-lg-9 col-md-8">{profile.email}</div>
        </div>
      </div>
    </div>
  );
}
