from numpy import *
import pylab as p
# Definition of parameters
a = 1.1
b = 1.2
c = 1.5
d = 1.75
def dX_dt(X, t=1):
	""" Return the growth rate of fox and rabbit populations. """
	#return array([a*X[0] - b*X[0]*X[1],
    #             -c*X[1] + d*X[0]*X[1]])
	return array([a*X[0] - b*X[0]*X[1] - 0.01*X[0]*X[0] ,
 	                  -c*X[1] + d*X[0]*X[1] -0.002*X[1]*X[1] ])

from scipy import integrate
t = linspace(1, 1500,  10000)              # time
#print t

X0 = array([3, 5])                     # initials conditions: [Victim, Predator]
X, infodict = integrate.odeint(dX_dt, X0, t, full_output=True)
infodict['message']
#print infodict
rabbits, foxes = X.T
print rabbits
f1 = p.figure()
p.plot(t, rabbits, 'r-', label='Victim')
p.plot(t, foxes  , 'b-', label='Predator')
p.grid()
p.legend(loc='best')
p.xlabel('time')
p.ylabel('population')
p.title('Evolution of predator and victim population')
f1.savefig('LotkaVolterra.png')

f2 = p.figure()
p.plot(foxes, rabbits, 'r-', label='Victim')
p.grid()
p.legend(loc='best')
p.xlabel('Victim')
p.ylabel('Predator')
p.title('Evolution of predator and victim population')
f2.savefig('LotkaVolterra2.png')