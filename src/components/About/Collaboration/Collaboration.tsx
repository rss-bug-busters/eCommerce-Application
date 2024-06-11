import { FC } from 'react';

const Collaboration: FC = function () {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-700 dark:text-white">Collaboration</h3>
      <div className="flex flex-wrap place-content-around justify-start gap-5 rounded-lg bg-slate-100 p-6  shadow-inner ">
        In our React development team, collaboration is key. We maintain efficiency
        through regular weekly calls where we discuss progress, share advice, and
        distribute tasks. Weekly Calls Review Progress: Discuss completed tasks and
        challenges. Share Advice: Exchange insights and troubleshooting tips. Distribute
        Issues: Assign tasks for the upcoming week based on expertise and availability.
        Collaboration Practices Issue Tracking: Use tools like Jira or GitHub Issues for
        task management. Code Reviews: Maintain code quality and share knowledge. Pair
        Programming: Solve complex issues and foster team bonding. Documentation: Ensure
        easy understanding and contribution to the project. Communication and Support Open
        communication channels through Slack and email for ongoing support and assistance.
        Continuous Improvement Conduct retrospective meetings after each sprint to reflect
        and improve collaboration strategies. Our React team thrives on regular
        communication, mutual support, and organized task management, ensuring a
        productive and harmonious work environment.
      </div>
    </div>
  );
};

export default Collaboration;
