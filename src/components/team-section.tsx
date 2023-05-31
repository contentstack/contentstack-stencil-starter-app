import { h } from '@stencil/core';
import { Image } from '../typescript/action';

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: Employee;
}

type Data = {
  title_h2: string;
  description: string;
  employees: [Employee];
  $: Data;
}

type OurTeam = {
  ourTeam: Data;
  key: string;
}

export default function TeamSection(props: OurTeam) {
  const { ourTeam } = props;
  return (
    <div class="about-team-section">
      <div class="team-head-section">
        {ourTeam.title_h2 && <h2 {...ourTeam.$?.title_h2 as {}}>{ourTeam.title_h2}</h2>}
        {ourTeam.description ? <p {...ourTeam.$?.description as {}}>{ourTeam.description}</p> : ''}
      </div>
      <div class="team-content">
        {ourTeam.employees?.map((employee, index) => (
          <div class="team-details" key={index}>
            {employee.image && <img {...employee.image.$?.url as {}} alt={employee.image.filename} src={employee.image.url} />}
            <div class="team-details">
              {employee.name && <h3 {...employee.$?.name as {}}>{employee.name}</h3>}
              {employee.designation && <p {...employee.$?.designation as {}}>{employee.designation}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
