import Image from "next/image";
import { Card, CardBody } from "reactstrap";

export default function Info({ profile }) {
  
  return (
    <Card>
      <CardBody className="card-body profile-card pt-4 d-flex flex-column align-items-center">
        { profile.photo &&
        <Image
          src={profile.photo}
          alt="Pérfil"
          width="100%"
          height="100%"
          className="rounded-circle"
        />}
        
        <h2>{profile.fullname}</h2>
        <h3>{profile.job}</h3>
      </CardBody>
    </Card>
  );
}
