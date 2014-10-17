git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = acd15adc439507207b63f2f21c9e5f9435ee4b4e ]
     then
         export GIT_AUTHOR_DATE="Tues Oct 14 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Tues Oct 14 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = c50bf71459f6aa487b0d2755408238bb446ab245 ]
     then
         export GIT_AUTHOR_DATE="Sun Oct 12 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Sun Oct 12 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = a6bdf0bc2ba15b50c0143dbd6fe93ec556d1e8fd ]
     then
         export GIT_AUTHOR_DATE="Fri Oct 10 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Fri Oct 10 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = dbb36d810228863bdafe42ca698ffd963900c393 ]
     then
         export GIT_AUTHOR_DATE="Wed Oct 8 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Wed Oct 8 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = acd145e9187427a5183e3ef27057fcba3e2417c0 ]
     then
         export GIT_AUTHOR_DATE="Tues Oct 7 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Tues Oct 7 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = 13700389272fcb5fc448e6613bf402125cc15be3 ]
     then
         export GIT_AUTHOR_DATE="Sun Oct 5 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Sun Oct 5 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = a894bb911bb8fd34e8e151f24df1902377d143db ]
     then
         export GIT_AUTHOR_DATE="Wed Oct 1 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Wed Oct 1 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = e57f3671da7fe856117eb3fbd451992e7dfc9fc0 ]
     then
         export GIT_AUTHOR_DATE="Wed Oct 15 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Wed Oct 15 01:02:14 2014 -0700"
     fi'

git filter-branch -f --env-filter \
    'if [ $GIT_COMMIT = 45821c612f8750f3977d4b5cd98536d48a3ba00e ]
     then
         export GIT_AUTHOR_DATE="Wed Oct 15 01:02:14 2014 -0700"
         export GIT_COMMITTER_DATE="Wed Oct 15 01:02:14 2014 -0700"
     fi'

