import { h } from '@stencil/core';
import { Image } from '../typescript/action';

type AdditionalParam = {
  title_h2: {};
  description: {};
  name: {};
  designation: {};
}

type Employee = {
  image: Image;
  name: string;
  designation: string;
  $: AdditionalParam;
}

type Data = {
  title_h2: string;
  description: string;
  employees: [Employee];
  $: AdditionalParam;
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
        {ourTeam.title_h2 && <h2 {...ourTeam.$?.title_h2}>{ourTeam.title_h2}</h2>}
        {ourTeam.description ? <p {...ourTeam.$?.description}>{ourTeam.description}</p> : ''}
      </div>
      <div class="team-content">
        {ourTeam.employees?.map((employee, index) => (
          <div class="team-details" key={index}>
            {employee.image && <img {...employee.image.$?.url} alt={employee.image.filename} src={employee.image.url} />}
            <div class="team-details">
              {employee.name && <h3 {...employee.$?.name}>{employee.name}</h3>}
              {employee.designation && <p {...employee.$?.designation}>{employee.designation}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
