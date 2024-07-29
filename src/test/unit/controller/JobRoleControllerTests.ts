import * as JobRoleController from "../../../main/controllers/JobRoleController";
import * as JobRoleService from "../../../main/services/JobRoleService";
import { JobRoleResponse } from "../../../main/models/JobRoleResponse";
import { expect } from 'chai';
import sinon from 'sinon';
import { LoginRequest } from "../../../main/models/LoginRequest";
import * as AuthService from "../../../main/services/AuthService";

const expected: JobRoleResponse = {
    id: 1,
    roleName: "Manager",
    location: "New York",
    capability: "Coding",
    band: "B",
    closingDate: new Date(2019, 1, 16),
    status: "open"
}

describe('JobRoleController', function () {
    afterEach(() => {
        sinon.restore();
    });

    describe('getAllJobRoles', function () {
        it('should view Job Roles when Job Roles returned', async () => {

            const loginRequestObj: LoginRequest = {
                email: "adam@random.com",
                password: "pass123"
            }
            const jobRoleList = [expected];

            sinon.stub(AuthService, 'getTokenByloggingIn').resolves('12345');

            const req = {
                body: loginRequestObj,
                session: { token: '' }
            };

            const res = {
                render: sinon.spy(),
                redirect: sinon.spy(),
            };

            sinon.stub(JobRoleService, 'getJobRoles').resolves(jobRoleList);

            await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

            expect(res.render.calledOnce).to.be.true;
            expect(res.render.calledWith('pages/allJobRolesList.html', { jobRoles: jobRoleList, pageName: "Job Roles" })).to.be.true;
        });
    })
    it('should render view with error message when error thrown', async () => {

        const loginRequestObj: LoginRequest = {
            email: "adam@random.com",
            password: "pass123"
        }

        const errorMessage: string = 'Error message';

        sinon.stub(AuthService, 'getTokenByloggingIn').resolves('12345');

        const req = {
            body: loginRequestObj,
            session: { token: '' }
        };

        const res = {
            render: sinon.spy(),
            redirect: sinon.spy(),
            locals: { errormessage: '' }
        };

        sinon.stub(JobRoleService, 'getJobRoles').rejects(new Error(errorMessage));

        await JobRoleController.getAllJobRoles(req as any, res as any); // eslint-disable-line @typescript-eslint/no-explicit-any

        expect(res.render.calledOnce).to.be.true;
        expect(res.render.calledWith('pages/allJobRolesList.html')).to.be.true;
        expect(res.locals.errormessage).to.equal(errorMessage);
    });
})