import urllib

from Form import Form
from dbConnector import dbconnector


class Session(dict):
    def __init__(self):
        self.SessionParams = {"Date": "", "pID_Shifts": "", "userid": "", "user": ""}

    def push(self, data):
        data.append({"SessionParams": self.SessionParams})
        return data

    def addSessionParams(self, d):
        for x in d:
            for s in x.iteritems():
                if self.SessionParams.has_key(s[0]):
                    self.SessionParams[s[0]] = x[s[0]]


class shiftScheduler:
    def __init__(self, dbpool):
        self.dbpool = dbpool
        self.dbc = dbconnector(self.dbpool)
        self.Session = Session()
        self.Form = {}

    def initForm(self):
        if self.Form == {}:
            return Form(self)
        else:
            return self.Form

    def adminPanelForm(self, request):
        f = self.initForm()
        d = self.getparamsfromrequest(request)
        f.morph(d)
        return f.FormData

    def getparamsfromrequest(self, request):

        def GETparams(request):
            r = []
            for x in request.GET.iteritems():
                if x[1].split('=')[0] == 'getSP:':
                    r.append({str(x[0]): str(self.Session.SessionParams[x[1].split('=')[1]])})
                else:
                    r.append({str(x[0]): str(x[1])})
            return r

        def POSTparams(request):
            r = []
            for x in request.POST.iteritems():
                r.append({str(x[0]): str(x[1])})
            return r

        if request.method == 'GET':
            result = GETparams(request)
        elif request.method == 'POST':
            result = POSTparams(request)
        return result

    def getMenu(self, user):

        r = urllib.urlopen('shiftScheduler/static/menu/menu.html')
        r = r.read()
        return r

    def getDaysShifts(self, p):
        dbc = dbconnector(self.dbpool)
        result = dbc.SelectProcedure('getDaysShifts', p)
        return result

    def getShiftPersonel(self, p):
        dbc = dbconnector(self.dbpool)
        result = dbc.SelectProcedure('getDaysPersonel', p)
        return result

    def ReserveShift(self, p):
        dbc = dbconnector(self.dbpool)
        result = dbc.SelectProcedure('ReserveShift', p)
        return result

    def WebLogin(self, p):
        dbc = dbconnector(self.dbpool)
        result = dbc.SelectProcedure('WebLogin', p)
        return result

    # Events
    def dayclicked(self, request):
        d = self.getparamsfromrequest(request)
        self.Session.addSessionParams(d)
        data = self.getDaysShifts(d)
        for x in data:
            pdata = self.getShiftPersonel([x])
            x['personel'] = pdata
        self.Session.push(data)
        return data

    def shiftclicked(self, request):
        dbc = dbconnector(self.dbpool)
        d = self.getparamsfromrequest(request)
        self.Session.addSessionParams(d)
        data = dbc.SelectProcedure('getDaysPersonel', d)
        self.Session.push(data)
        return data

    def login(self, request):
        d = self.getparamsfromrequest(request)
        data = self.WebLogin(d)
        if data[0].get('result') == 1:
            self.Session.addSessionParams([{'userid': data[0].get('ID'), "user": data[0].get('user')}])

        return data

    def reserve(self, request):
        d = self.getparamsfromrequest(request)
        r = self.ReserveShift(d)
        data = self.getShiftPersonel(r)
        return data
