import pika

url ='amqp://dttfhkfi:QIb4k-6TzOGR571j_oynfBwI9rxnn_zF@crocodile.rmq.cloudamqp.com/dttfhkfi'
params = pika.URLParameters(url)
connection = pika.BlockingConnection(params)
channel = connection.channel()

channel.queue_declare(queue='hello')

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)

channel.basic_consume(callback,
                      queue='hello',
                      no_ack=True)

print(' [*] Waiting for messages. To exit press CTRL+C')
channel.start_consuming()
