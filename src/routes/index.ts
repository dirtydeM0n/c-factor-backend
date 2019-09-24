import { Router } from 'express';

const SwaggerAPIRouter = Router();
export { SwaggerAPIRouter };

export { RootRouter } from './root.router';
export { AuthRouter } from './auth/auth.router';
export { UserRouter, AvatarRouter } from './user/user.router';
export { RoleRouter } from './role/role.router';
export { DepartmentRouter } from './department/department.router';
export { CompanyRouter } from './company/company.router';
export { ClientRouter } from './client/client.router';
export { CampaignRouter, CampaignInviteRouter } from './campaign/campaign.router';
export { CompetencyRouter } from './competency/competency.router';