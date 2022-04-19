import { h } from '@stencil/core';

export default function TeamSection(props) {
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
