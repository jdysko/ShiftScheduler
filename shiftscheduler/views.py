import json

import PySQLPool
from pyramid.view import view_config

import shiftScheduler

# @view_config(route_name='home', renderer='templates/mytemplate.pt')
# def my_view(request):
#    return {'project': 'ShiftScheduler'}

dbpool = PySQLPool.getNewConnection(host='localhost',
                                    port=3306,
                                    user='jd',
                                    passwd='123456#A',
                                    db='scheduler')
ss = shiftScheduler.shiftScheduler(dbpool)


@view_config(route_name='login', renderer='templates/login.pt')
def login(request):
    return {}


@view_config(route_name='logme', renderer='json')
def logme(request):
    if request.method == "GET":
        r = ss.login(request)
    return r


@view_config(route_name='home', renderer='templates/index.pt')
def home(request):
    r = ss.getMenu(ss.Session.SessionParams['user'])
    # s = shift()
    # p = personel()
    return {'user': ss.Session.SessionParams.get('user'),
            'menu': r}


@view_config(route_name='home_json', renderer='json')
def home_json(request):
    d = ss.getparamsfromrequest(request)
    r = ss.Session.addSessionParams(d)
    return r


@view_config(route_name='scheduler', renderer='json')
def scheduler(request):
    r = ss.dayclicked(request)
    r = json.dumps(r)
    return r


@view_config(route_name='personel', renderer='json')
def personel(request):
    r = ss.shiftclicked(request)
    r = json.dumps(r)
    return r


@view_config(route_name='reserve', renderer='json')
def reserve(request):
    r = ss.reserve(request)
    r = json.dumps(r)
    return r


@view_config(route_name="form", renderer='json')
def formHandler(request):
    r = ss.adminPanelForm(request)
    r = json.dumps(r)
    return r
