import { FC } from 'react';

const teamCollaboration = {
  title: 'Team Collaboration 🤝',
  description:
    'In our React development team, collaboration is key. We maintain efficiency through regular weekly calls where we discuss progress, share advice, and distribute tasks.',
  weeklyCalls: {
    title: 'Weekly Calls',
    items: [
      'Review Progress: Discuss completed tasks and challenges.',
      'Share Advice: Exchange insights and troubleshooting tips.',
      'Distribute Issues: Assign tasks for the upcoming week based on expertise and availability.',
    ],
  },
  collaborationPractices: {
    title: 'Collaboration Practices 👥',
    items: [
      'Issue Tracking: Use tools like GitHub Issues for task management.',
      'Code Reviews: Maintain code quality and share knowledge.',
      'Pair Programming: Solve complex issues and foster team bonding.',
      'Documentation: Ensure easy understanding and contribution to the project.',
    ],
  },
  continuousImprovement: {
    title: 'Continuous Improvement 📝',
    items: [
      'Conduct retrospective meetings after each sprint to reflect and improve collaboration strategies.',
    ],
  },
  summary:
    'Our team thrives on regular communication, mutual support, and organized task management, ensuring a productive and harmonious work environment.',
};

const Collaboration: FC = function () {
  return (
    <div className="mt-3 flex flex-col gap-3">
      <h3 className="text-2xl font-bold text-gray-700 dark:text-white">Collaboration</h3>
      <div className="flex flex-wrap place-content-around justify-start gap-5 rounded-lg bg-slate-100 p-6  shadow-[inset_0px_1px_52px_-20px_rgba(66,68,90,1)] dark:bg-gray-600">
        <div className="flex flex-wrap gap-3">
          <div>
            <h4 className="font-bold text-gray-700 dark:text-white ">
              {teamCollaboration.title}
            </h4>
            <p>{teamCollaboration.description}</p>
          </div>
          <section className="rounded-lg border-2 border-slate-300 p-2">
            <h5 className="font-bold text-gray-700 dark:text-white">
              {teamCollaboration.weeklyCalls.title}
            </h5>
            <ul className="mt-6 list-inside list-disc ">
              {teamCollaboration.weeklyCalls.items.map((item) => (
                <li key={`weeklyCalls-${Math.random().toString(36).slice(2, 9)}`}>
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border-2 border-slate-300 p-2">
            <h4 className="font-bold text-gray-700 dark:text-white">
              {teamCollaboration.collaborationPractices.title}
            </h4>
            <ul className="mt-6 list-inside list-disc">
              {teamCollaboration.collaborationPractices.items.map((item) => (
                <li
                  key={`collaborationPractices-${Math.random().toString(36).slice(2, 9)}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-lg border-2 border-slate-300 p-2">
            <h4 className="font-bold text-gray-700 dark:text-white">
              {teamCollaboration.continuousImprovement.title}
            </h4>
            <ul className="mt-6 list-inside list-disc">
              {teamCollaboration.continuousImprovement.items.map((item) => (
                <li
                  key={`continuousImprovement-${Math.random().toString(36).slice(2, 9)}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
          <p>{teamCollaboration.summary}</p>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;
