
# Role Based Authentication


### Types of Users / Roles

The following roles we have support of right now:

1. admin 
2. client
3. applicant
4. guest

5. public (we use this for publical access or browser hitting)

### APIs Endpoints access with Roles

**API ENDPOINT**|**ACCESS ROLES**
|---|---|
/                       |       public `(Read)`
/auth                   |       public `(Read)`
/users                  |       applicant `(CRUD)`, client `(CRUD)`, admin `(CRUD)`
/clients                |       admin `(CRUD)`
/departments            |       client `(CRUD)`
/companies              |       client `(CRUD)`
/avatars                |       applicant `(CRUD)`, client `(CRUD)`, admin `(CRUD)`
/campaigns              |       client `(CRUD)`, admin `(CRUD)`
/campaignInvites        |       client `(CRUD)`, admin `(CRUD)`
/competencies           |       client `(CRUD)`, admin `(CRUD)`
/competencyData         |       client `(CRUD)`, public `(Read)`
